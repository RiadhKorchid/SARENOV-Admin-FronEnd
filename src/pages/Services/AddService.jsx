import { Box, TextField, FormControl, Stack, Button } from "@mui/material"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"

import axios from "axios"
const AddService = ({ closeModal }) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [time, setTime] = useState('')
    const [image, setImage] = useState("")


    const newPostMutation = useMutation({
        mutationFn: (payload) => axiosClient.post('/services/addService', payload),
        onSuccess: (data) => {
            closeModal()
            setName("")
            setDescription("")
            setPrice("")
            setTime("")
            setImage("")
            queryClient.invalidateQueries(["services"])

        },
        onError: () => {

        }
    });
    const handleFileChange = (event) => {
        const image = event.target.files[0]
        setImage(image)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // const payload = {
        //     name, description, price, time, image
        // };
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('time', time);


        newPostMutation.mutate(formData)
    }
    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Stack spacing={2} direction="column">

                    <TextField label="Name" type="text" fullWidth
                        onChange={(e) => setName(e.target.value)} value={name} />
                    <Stack spacing={2} direction="row">
                        <label htmlFor="">Image :</label>
                        <input type="file" onChange={handleFileChange} />
                    </Stack>

                    <Stack spacing={2} direction="row">
                        <TextField label="Price" type="number" fullWidth
                            onChange={(e) => setPrice(e.target.value)} value={price} />
                        <TextField label="time" type="text" fullWidth
                            onChange={(e) => setTime(e.target.value)}
                            value={time}

                        />
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <TextField label="Description" type="text" fullWidth
                            rows={4}
                            multiline
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)} value={description} />

                    </Stack>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </Stack>

            </form>
        </>);
}


export default AddService;