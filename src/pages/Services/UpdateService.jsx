import { Box, TextField, FormControl, Stack, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"
import { useFetch } from "../../hooks/useFetch"


const UpdateService = ({ closeModal, defaultService }) => {

    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [time, setTime] = useState("")
    const [imagePublicId, setImage] = useState("")

    const newUpdateMutation = useMutation({
        mutationFn: (payload) => axiosClient.put(`/services/update-service/${defaultService?._id}`, payload),
        onSuccess: () => {
            closeModal()
            queryClient.invalidateQueries(["services"])
        },
        onError: () => {

        }
    });
    const resetState = () => {
        setName(defaultService?.name)
        setDescription(defaultService?.description)
        setPrice(defaultService?.price)
        setTime(defaultService?.time)
        setImage(defaultService?.imagePublicId)
    }

    useEffect(() => {
        resetState()
    }, [defaultService])

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name, description, price, time, imagePublicId
        }
        newUpdateMutation.mutate(payload)
    };

    return (<>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction="row">
                    <TextField label="Name" type="text" fullWidth
                        onChange={(e) => setName(e.target.value)} value={name}
                        multiline
                        variant="outlined" />
              
                </Stack>
                <Stack spacing={2} direction="row">
                    <TextField label="Price" type="number" fullWidth
                        onChange={(e) => setPrice(e.target.value)} value={price}
                        multiline
                        variant="outlined"
                    />
                    <TextField label="time" type="text" fullWidth
                        onChange={(e) => setTime(e.target.value)} value={time}
                        multiline
                        variant="outlined"
                    />
                </Stack>
                <Stack spacing={2} direction="row">
                    <TextField label="Description" type="text" fullWidth
                        rows={4}
                        multiline
                        variant="outlined"
                        onChange={(e) => setDescription(e.target.value)} value={description} />

                </Stack>
                <Button type="submit" variant="contained" color="primary">update</Button>
            </Stack>

        </form>

    </>);
}

export default UpdateService;