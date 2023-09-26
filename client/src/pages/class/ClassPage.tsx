import {useParams} from "react-router-dom";
import {ErrorPage} from "../error";
import {CoursePanel} from "../../widgets";

export function ClassPage() {
    const { classId } = useParams();

    if (!classId) {
        return <ErrorPage errorMessage={"Bad class id"}/>
    }

    return (
        <div>
            <CoursePanel classId={classId}/>
        </div>
    );
}