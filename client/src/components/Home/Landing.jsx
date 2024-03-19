import "./Landing.css";
import Button from "../Button/Button"

function Landing() {
  return (
    <>
      <style>
        @import url(`https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap`)
      </style>
      <div className="landing-container">
        <div className="unreal-factory">
          <h1>
            UNREAL FACTORY
          </h1>
        </div>
        <hr />
        <div className="unreal-description">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, sapiente maiores. Nesciunt ducimus quia sit ipsum est voluptas. Laborum, atque sapiente blanditiis ipsam non tempora dolores corporis distinctio obcaecati nesciunt.</p>
        </div>
        <div className="button-container">
          <Button />
        </div>
      </div>
    </>
  )
}

export default Landing
