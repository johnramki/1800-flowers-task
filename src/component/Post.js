const Post = (props) => {
    const item = props.item;
    return(
        <tr key={props.postNo}>
            <td>{props.postNo}</td>
            <td>{item.title}</td>
            <td>
            <button
                className="btn btn-primary" 
                onClick={()=>{props.onclickHandler(props.uniqueId)}}
            >
            Edit
            </button>
            </td>
        </tr>
    )
    
}
export default Post;