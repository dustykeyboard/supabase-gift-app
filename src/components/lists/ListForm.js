import { useState } from "react"

const ListForm = ({onSubmit}) => {
    const [list, setList] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()
        onSubmit(list)
        setList("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a new list</h3>
            <p><label>List name:<br />
                <input
                type="text"
                value={list}
                aria-label="list"
                onChange={event => setList(event.target.value)}
            /></label></p>

            <p><button type="submit">Add list</button></p>
        </form>
    )
}

export default ListForm;