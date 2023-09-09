interface ErrorPageProps {
    errorMessage?: string
}

export function ErrorPage({errorMessage}: ErrorPageProps) {
    return (
        <div>
            {errorMessage? errorMessage : "error"}
        </div>
    );
}