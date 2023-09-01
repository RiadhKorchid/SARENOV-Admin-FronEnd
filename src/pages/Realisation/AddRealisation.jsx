import { Box, TextField, FormControl, Stack, Button, TextareaAutosize } from "@mui/material"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"

const AddRealisation = ({closeModal}) => {

    const queryClient = useQueryClient()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const newPostMutation=useMutation({
        mutationFn: (payload) => axiosClient.post('/realisation/addNewRealisation', payload),
        onSuccess: () => {
            closeModal()
            queryClient.invalidateQueries(["realisations"])
            console.log("new realisation added succesfuly ")
        },
        onError: () => {

        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = { title, description, image }

        newPostMutation.mutate(payload)

    }

    return (<>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction="row">
                    <TextField label="Tilte" type="text" fullWidth
                        onChange={(e) => setTitle(e.target.value)} />
                    <TextField label="Image" type="text" fullWidth
                        onChange={(e) => setImage(e.target.value)} />

                </Stack>

                <Stack spacing={2} direction="row">
                    <TextField
                        label="Description"
                        multiline
                        variant="outlined"
                        rows={4}
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)} />
                </Stack>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </Stack>

        </form>
    </>);
}

export default AddRealisation;