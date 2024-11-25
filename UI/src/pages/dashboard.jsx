import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, RadialBarChart, RadialBar } from 'recharts';

// Date pentru rapoarte (hardcodate)
const dateRapoarte = [
    { name: 'Analize Sânge', value: 400 },
    { name: 'Radiografii', value: 300 },
    { name: 'RMN', value: 200 },
    { name: 'Altele', value: 100 },
];

// Date pentru graficul cu bare
const datePacienti = [
    { name: 'Ian', pacienti: 50 },
    { name: 'Feb', pacienti: 75 },
    { name: 'Mar', pacienti: 100 },
    { name: 'Apr', pacienti: 125 },
];

// Date pentru progres radial
const progresDate = [{ name: 'Finalizat', uv: 80, fill: '#8884d8' }];

// Culori pentru graficul circular
const CULORI = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
    return (
        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {/* Header */}
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
              Dashboard
            </Typography>

            {/* Layout tip grid pentru secțiunile dashboard-ului */}
            <Grid container spacing={3}>
                {/* Secțiunea cu grafic circular */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Distribuție Rapoarte
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={dateRapoarte}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                    >
                                        {dateRapoarte.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CULORI[index % CULORI.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Secțiunea cu grafic cu bare */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Tendințe Pacienți
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={datePacienti}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pacienti" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Secțiunea cu grafic radial */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Progres General
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadialBarChart
                                    innerRadius="10%"
                                    outerRadius="80%"
                                    data={progresDate}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar minAngle={15} dataKey="uv" fill="#8884d8" />
                                    <Tooltip />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Secțiunea cu lista de rapoarte recente */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Rapoarte Recente
                            </Typography>
                            {dateRapoarte.map((raport, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 1,
                                        borderBottom: '1px solid #ddd',
                                    }}
                                >
                                    <Typography>{raport.name}</Typography>
                                    <Typography>{raport.value} pacienți</Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
