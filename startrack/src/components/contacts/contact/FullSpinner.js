
import spinner from './spinnercof.gif';

const Spinner = () => {
    return (
    
        <div className={var1}>
            <img src={spinner} style={var2} alt="" />
        </div>

    )
}

// const var1 = {
//     width: "50px",
//     height: "150px"
// }
const var1 = {
    position: "absolute",
    top: "0",
    
    bottom: "0",
    right: "0",
  left:"0",
background:"black",
}
let var2 = {
    display: "block",
    margin: "2rem auto",
    width: "20rem",
    height: "20rem",
    

}
export default Spinner
