import { Box, TextField, FormControl, Stack, Button } from "@mui/material"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"


const AddComputer = ({ closeModal }) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [brand, setBrand] = useState("")
    const [procesor, setProcesor] = useState("")
    const [memory, setMemory] = useState("")
    const [storage, setStorage] = useState("")
    const [graphicsCard, setGraphicsCard] = useState("")
  
    const newPostMutation = useMutation({
        mutationFn: (payload) => axiosClient.post('/addNewComputer', payload),
        onSuccess: (data) => {
            closeModal()
            queryClient.invalidateQueries(["computers"])
            console.log("new computer added succesfuly ")
        },
        onError: () => {

        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name,description, price, rating,brand,
            procesor,memory,storage, graphicsCard
        };
        newPostMutation.mutate(payload);
    };
    return (
        <>
            <form className="add-computer-form" autoComplete="off" onSubmit={handleSubmit}>
                <Stack spacing={2} direction="column">
                    <Stack spacing={2} direction="row">
                        <TextField label="Name" type="text" fullWidth
                            onChange={(e) => setName(e.target.value)} />
                        <TextField label="Description" type="text" fullWidth
                            onChange={(e) => setDescription(e.target.value)} />
                    </Stack>

                    <Stack spacing={2} direction="row">
                        <TextField label="Price" type="number" fullWidth
                            onChange={(e) => setPrice(e.target.value)} />
                        <TextField label="Rating" type="number" fullWidth
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <TextField label="brand" type="text" fullWidth
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <TextField label="procesor" type="text" fullWidth
                            onChange={(e) => setProcesor(e.target.value)} />
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <TextField label="memory" type="text" fullWidth
                            onChange={(e) => setMemory(e.target.value)} />
                        <TextField label="storage" type="text" fullWidth
                            onChange={(e) => setStorage(e.target.value)} />
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <TextField label="graphicsCard" type="text" fullWidth
                            onChange={(e) => setGraphicsCard(e.target.value)} />
                    </Stack>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </Stack>

            </form>
        </>);
}


export default AddComputer;