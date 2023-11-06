export default function Highlight(props){
    return(
        <div className="highlight" >
<p className="heading">{props.highlight_text}</p>
<h1 className="values">{props.highlight_measurement}</h1>
{props.icon}
        </div>
    )
}