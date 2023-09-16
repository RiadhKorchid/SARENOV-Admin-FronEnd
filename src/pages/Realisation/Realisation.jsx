import { useEffect, useState } from "react";
import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa"
import ModalComponent from "../../Components/Modal";
import DeleteModal from "../../Components/DeleteModal";
import { useFetch } from "../../hooks/useFetch";
import AddRealisation from "./AddRealisation";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axiosClient from "../../axios-client"
import UpdateRealisation from "./UpdateRealisation";
const Realisation = () => {
    const { data, isLoading } = useFetch(["realisations"], '/realisation/getAllRealisation')
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [deleteModal, setDelete] = useState(false)
    const [selectRealisation, setId] = useState("")
    const [defaultRealisation, setDefaultValue] = useState({})
    const handleOpen = (e) => {
        setOpen(!open)
    }
    const handleOpenDelete = (id) => {
        setId(id)
        setDelete(!deleteModal)
    }
    const handleOpenUpdate = (el) => {
        setUpdate(!update)
        setDefaultValue(el)
    }
    const handleCloseUpdate = () => {
        setUpdate(false)
        setDefaultValue({})
    }


    const cellStyle = {
        maxWidth: '350px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };
    const newDeleteMutation = useMutation({
        mutationFn: (selectRealisation) => axiosClient.delete(`/realisation/delete/${selectRealisation}`),
        onSuccess: () => {
            setDelete(!deleteModal)
            queryClient.invalidateQueries(["realisations"])
            console.log("Deleted added succesfuly ")
        },
    });
    const handleDeleteRealisation = (e) => {
        e.preventDefault()
        newDeleteMutation.mutate(selectRealisation)
    }

    if (isLoading) {
        return <h2>loading .... </h2>
    }
    return (

        <>
            <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" onClick={handleOpen} cursor={"pointer"} >
                    <FaPlus size={17} color="white" />
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell >Description</TableCell>
                            <TableCell>Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((el, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {el.title} </TableCell>
                                <TableCell style={cellStyle}>{el.description}</TableCell>
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${el.image}`} style={{alignContent:"center",alignSelf:"center",padding:"10px",width : "120px" ,borderRadius:"5px", height :"80px"}}alt="" />
                                <TableCell >
                                    <FaEdit size={17} color="green" cursor="pointer" onClick={(e) => handleOpenUpdate(el)} />
                                    <span>.....</span>
                                    <FaTrashAlt size={17} color="red" cursor="pointer"
                                        onClick={(e) => handleOpenDelete(el._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <ModalComponent open={open} closeModal={handleOpen} title={"Add New Realisation"} Component={AddRealisation} />
            <DeleteModal open={deleteModal} closeModal={handleOpenDelete}
                onClick={handleDeleteRealisation} />
                 <ModalComponent open={update} closeModal={handleCloseUpdate} title={"update Realisation"} Component={UpdateRealisation} defaultService={defaultRealisation} />
        </>


    );
}

export default Realisation;