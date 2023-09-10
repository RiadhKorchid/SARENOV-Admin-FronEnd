import { Box, TextField, FormControl, Stack, Button, TextareaAutosize } from "@mui/material"
import { useState,useEffect } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"



const UpdateRealisation = ({ closeModal, defaultService }) => {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const newUpdateMutation = useMutation({
        mutationFn: (payload) => axiosClient.put(`/realisation/update-realisation/${defaultService?._id}`, payload),
        onSuccess: () => {
            closeModal()
            queryClient.invalidateQueries(["realisations"])
        },
        onError: () => {

        }
    });
    const resetState = () => {
        setTitle(defaultService?.title)
        setDescription(defaultService?.description)
        setImage(defaultService?.image)
    }

    useEffect(() => {
        resetState()
    }, [defaultService])
    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = { title, description, image }
        newUpdateMutation.mutate(payload)

    }

    return (<>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction="row">
                    <TextField label="Tilte" type="text" fullWidth
                        onChange={(e) => setTitle(e.target.value)} value={title} />
                    <TextField label="Image" type="text" fullWidth
                        onChange={(e) => setImage(e.target.value)} value={image} />

                </Stack>

                <Stack spacing={2} direction="row">
                    <TextField
                        label="Description"
                        multiline
                        variant="outlined"
                        rows={4}
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)} value={description} />
                </Stack>
                <Button type="submit" variant="contained" color="primary">update</Button>
            </Stack>

        </form>
    </>);
}

export default UpdateRealisation;