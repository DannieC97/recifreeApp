export default function ListofIngredients(props) {
    const data = props.data
    //console.log(data)
    return (
        
        <div>

            {data.map((item) => {
                return <ul key={props.keyId - Math.random() * (100-1)}>{item.ingredient}, {item.quantity} </ul>

            })}

        </div>
    );
}
