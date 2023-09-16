import { Box, TextField, FormControl, Stack, Button, TextareaAutosize } from "@mui/material"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"
import axios from "axios"
const AddRealisation = ({ closeModal }) => {

    const queryClient = useQueryClient()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const newPostMutation = useMutation({
        mutationFn: (payload) => axiosClient.post('/realisation/addNewRealisation', payload),
        onSuccess: () => {
            closeModal()
            queryClient.invalidateQueries(["realisations"])
            setTitle("")
            setDescription("")
            setImage("")
            console.log("new realisation added succesfuly ")
        },
        onError: () => {

        }
    })
    const handleChangeFile=(event)=>{
        const file = event.target.files[0]
        setImage(file)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // const payload = {
        //     name, description, price, time, image
        // };
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('description', description);
      
        
    newPostMutation.mutate(formData)    
    }

    return (<>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column">
                    <TextField label="Tilte" type="text" fullWidth
                        onChange={(e) => setTitle(e.target.value)}  value={title}/>

                <Stack spacing={2} direction="row">
                   <label htmlFor="">Image :</label>
                   <input type="file" onChange={handleChangeFile} />
                        </Stack>

                <Stack spacing={2} direction="row">
                    <TextField
                        label="Description"
                        multiline
                        variant="outlined"
                        rows={4}
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}  value={description}/>
                </Stack>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </Stack>

        </form>
    </>);
}

export default AddRealisation;