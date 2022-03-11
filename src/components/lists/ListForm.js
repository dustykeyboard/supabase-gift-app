import { useState } from "react"

const ListForm = ({ original, onSubmit, onCancel }) => {
    const [list, setList] = useState(original || { name: '' })

    const handleSubmit = async event => {
        event.preventDefault()
        onSubmit(list)
    }

    return (
        <form onSubmit={handleSubmit}>
      <h3>{original.id ? "Update" : "Add"} list</h3>
            <p><label>List name:<br />
                <input
                type="text"
                value={list.name}
                aria-label="list"
                    onChange={event => setList({ ...list, name: event.target.value })}
            /></label></p>

            <p>
                <button type="submit">{original.id ? "Update" : "Add"} list</button>
                <button type="reset" onClick={onCancel}>Cancel</button>
            </p>
        </form>
    )
}

export default ListForm;