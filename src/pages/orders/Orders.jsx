import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button } from "@mui/material"
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa"
import ModalComponent from "../../Components/Modal";
import { useFetch } from "../../hooks/useFetch";
import AddOrder from "./AddOrder";
const Orders = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = (e) => {
        setOpen(!open)
    }

    const { data, isLoading } = useFetch(["orders"], '/orders/getAllOrders')

    if (isLoading) {
        return <h2>loading .... </h2>
    }

    return (

        <>
        <div style={{marginBottom :"0.75rem" ,display :"flex" , justifyContent : "flex-end"} }>
            <Button variant="contained" color="primary" onClick={handleOpen} cursor={"pointer"} >
                <FaPlus size={17} color="white"  />
            </Button>
        </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID </TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >ClientEmail</TableCell>
                            <TableCell >Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((el, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {el.orderId} </TableCell>
                                <TableCell >{el.totalPrice}</TableCell>
                                <TableCell >{el.clientEmail}</TableCell>
                                <TableCell >{el?.date}</TableCell>
                                <TableCell >
                                    <FaEdit size={17} color="green" cursor={"pointer"} />
                                    <span>.....</span>
                                    <FaTrashAlt size={17} color="red" cursor={"pointer"} />
                                  
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <ModalComponent open={open} closeModal={handleOpen} title={"Add New Orders"} Component={AddOrder} />
        </>


    );
}

export default Orders;