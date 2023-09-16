import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material"
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa"
import ModalComponent from "../../Components/Modal";
import AddService from "./AddService";
import { useFetch } from "../../hooks/useFetch";
import DeleteModal from "../../Components/DeleteModal";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"
import UpdateService from "./UpdateService";
const Service = () => {
    const { data, isLoading } = useFetch(["services"], '/services/getAllServices')
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [deleteModal, setDelete] = useState(false)
    const [selectService, setId] = useState("")
    const [defaultService, setDefaultService] = useState({})
    const handleOpen = (e) => {
        setOpen(!open)
    }
    const handleOpenDelete = (id) => {
        setId(id)
        setDelete(!deleteModal)
    }
    const handleOpenUpdate = (el) => {
        setDefaultService(el)
        setUpdate(!update)
    }
    const handleCloseUpdate = () => {
        setDefaultService({})
        setUpdate(!update)
    }

    const cellStyle = {
        maxWidth: '200px', // Set your desired max-width here
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };
    const newDeleteMutation = useMutation({
        mutationFn: (selectService) => axiosClient.delete(`/services/delete-service/${selectService}`),
        onSuccess: () => {
            setDelete(!deleteModal)
            queryClient.invalidateQueries(["services"])
            console.log("Deleted added succesfuly ")
        },
    });
    const handleDeleteServices = (e) => {
        e.preventDefault()
        newDeleteMutation.mutate(selectService)
    }
    if (isLoading) {
        return <h2>loading .... </h2>
    }

    return (

        <> <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleOpen} cursor={"pointer"} >
                <FaPlus size={17} color="white" />
            </Button>
        </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >time</TableCell>
                            <TableCell >Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((el, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {el.name} </TableCell>
                                <TableCell style={cellStyle}>{el.description}</TableCell>
                                <TableCell >{el.price}</TableCell>
                                <TableCell >{el.time}</TableCell>
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${el.image}`} style={{alignContent:"center",alignSelf:"center",padding:"10px",width : "120px" ,borderRadius:"5px", height :"80px"}}alt="" />
                                <TableCell >
                                    <FaEdit size={17} color="green" cursor={"pointer"} onClick={(e) => handleOpenUpdate(el)} />
                                    <span>.....</span>
                                    <FaTrashAlt size={17} color="red" cursor={"pointer"}
                                        onClick={(e) => handleOpenDelete(el._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            
            <ModalComponent open={open} closeModal={handleOpen} title={"Add New Service"} Component={AddService} />
            <ModalComponent open={update} closeModal={handleCloseUpdate} title={"update Service"} Component={UpdateService} defaultService={defaultService} />
            <DeleteModal open={deleteModal} closeModal={handleOpenDelete}
                onClick={handleDeleteServices} />
        </>


    );
}

export default Service;