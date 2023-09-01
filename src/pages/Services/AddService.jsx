import { Box, TextField, FormControl, Stack, Button } from "@mui/material"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"


const AddService = ({ closeModal }) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [time, setTime] = useState('')
    const [imagePublicId, setImage] = useState("")


    const newPostMutation = useMutation({
        mutationFn: (payload) => axiosClient.post('/service/addService', payload),
        onSuccess: (data) => {
            closeModal()
            queryClient.invalidateQueries(["services"])
            console.log("new service added succesfuly ")
        },
        onError: () => {

        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name, description, price, time, imagePublicId,
        };
        newPostMutation.mutate(payload);
    };
    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Stack spacing={2} direction="column">
                    <Stack spacing={2} direction="row">
                        <TextField label="Name" type="text" fullWidth
                            onChange={(e) => setName(e.target.value)} />
                        <TextField label="Image" type="text" fullWidth
                            onChange={(e) => setImage(e.target.value)} />
                    </Stack>

                    <Stack spacing={2} direction="row">
                        <TextField label="Price" type="number" fullWidth
                            onChange={(e) => setPrice(e.target.value)} />
                        <TextField label="time" type="text" fullWidth
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <TextField label="Description" type="text" fullWidth
                            rows={4}
                            multiline
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)} />

                    </Stack>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </Stack>

            </form>
        </>);
}


export default AddService;