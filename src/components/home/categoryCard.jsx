import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export const CategoryCard = (props) => {
  const { categoryName, count, image, id, onClick } = props;
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "20px", margin: "20px" }}>
      <Image
        width={300}
        height={300}
        alt="card"
        src={`https://as2.ftcdn.net/v2/jpg/02/89/83/05/1000_F_289830568_Z4QCGwGDTOsvLRHsc7npjSkcrpsywOoL.jpg`}
      />
      <CardContent sx={{ textAlign: "center", padding: "10px !important" }}>
        <Typography
          className="card-title"
          gutterBottom
          variant="h5"
          component="div"
          noWrap
        >
          {categoryName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {count} Skills
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <button className="card-btn" onClick={() => onClick(id)}>
          View
        </button>
      </CardActions>
    </Card>
  );
};
