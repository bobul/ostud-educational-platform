package service

import (
	"encoding/json"
	"fmt"
	"github.com/dgryski/trifles/uuid"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func UploadImage(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(32 << 20) // 32 MB is the maximum file size
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		fmt.Print(err)
		fmt.Print("\n")
		http.Error(w, "Can`t read file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	filename := uuid.UUIDv4() + ".png"
	dst, err := os.Create(filepath.Join("static/images", filename))
	if err != nil {
		fmt.Print(err)
		http.Error(w, "Can`t create local file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		fmt.Print(err)
		http.Error(w, "Can`t copy to file", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]string)
	resp["filename"] = filename
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	return
}
