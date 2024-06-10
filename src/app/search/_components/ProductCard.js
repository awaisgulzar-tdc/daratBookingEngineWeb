import React from "react";
import {
  Typography,
  Box,
  Grid,
} from "@mui/material";
import ProCard from "@/app/pharmacy/_components/ProCard";

const ProductCard = ({ product }) => {
  return (
    <Grid container spacing={2}>
      {product.length > 0 ? (
        product.map((product, index) => (
          <Grid  item key={index} xs={12} lg={3} sm={6}>
            <ProCard product={product}/>
          </Grid>
        ))
      ) : (
        <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
            <Typography variant="h6" >No Product Found</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default ProductCard;
