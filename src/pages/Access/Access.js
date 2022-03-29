import { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import {
    Table,
    TableBody, 
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

import './Access.scss';

const Access = () => {

    const [logs, setLogs] = useState([]);

    useEffect( () => {
        database.ref('log')
                .get()
                .then( snapshot => {
                    const data = snapshot.val()

                    let logsContainer = []
                    for(let i in data) {
                        logsContainer.push(data[i])
                    }

                    setLogs(logsContainer);
                })
    }, [] )
    return (
        <div className="access">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Wallet Address</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Collection Address</TableCell>
                        <TableCell>NFT Name</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Street Address</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Postal / Zip code</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Pay</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {logs.map((log, key) => { 
                        return  (
                        <TableRow
                        key={key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="left">{log.time}</TableCell>
                        <TableCell align="left">
                            {log.wallet}
                        </TableCell>
                        <TableCell align="left">{log.code}</TableCell>
                        <TableCell align="left">{log.contract}</TableCell>
                        <TableCell align="left">{log.name}</TableCell>
                        <TableCell align="left">{log.firstName}</TableCell>
                        <TableCell align="left">{log.lastName}</TableCell>
                        <TableCell align="left">{log.email}</TableCell>
                        <TableCell align="left">{log.streetAddress}</TableCell>
                        <TableCell align="left">{log.city}</TableCell>
                        <TableCell align="left">{log.zipCode}</TableCell>
                        <TableCell align="left">{log.country}</TableCell>
                        <TableCell align="left">{log.pay ? log.pay: 0}(ETH)</TableCell>
                        {/* <TableCell align="right">{log.protein}</TableCell> */}
                        </TableRow>
                    )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Access;