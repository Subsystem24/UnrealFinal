import "./ModelCard.css"
import { Link } from "react-router-dom";

function ModelCard(props) {

  return (
    <>
      <Link className="modelCardLink" to={`/modelviewer/${props.id}`}>
        <div className="card">
          <img src={`public/img/${props.fileName}.png`} alt="sample" />
          <p>{props.fileName}</p>
        </div>
      </Link>
    </>
  )
}

export default ModelCard
