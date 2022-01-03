function Heading(props) {
    const titleStyle = {
        textAlign: "center",
        fontSize: "110px",
        fontWeight: "normal",
        fontFamily: "courier new",
        margin: "auto"
    }

    return (<h1 style = {titleStyle}>{props.title}</h1>);

}
export default Heading;