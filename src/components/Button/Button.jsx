import "./Button.css";

function Button(props){

    return(<div>
        <button className="btn">
        {props.title}

    </button>
    </div>);

}
export default Button;