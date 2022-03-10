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
            <input
                type="text"
                value={list}
                aria-label="list"
                onChange={event => setList(event.target.value)}
            />

            <button type="submit">
                add
            </button>
        </form>
    )
}

export default ListForm;