import { Stack, Typography, Chip } from "@mui/material";
import * as React from "react";
import { categoryData } from "../../constants/categoryData";

const ProjectCard: React.FC = () => {
  const skillSet = [
    "React.js",
    "restFull API intergration",
    "MongoDB",
    "PHP",
    "Website Design",
    "CSS",
  ];
  const handleClick = () => {
    console.log("click");
  };
  const title = "Zoom SDK Web Developer Needed";
  const detail =
    "I am in search of a skilled web developer to construct a professional meeting platform. This platform should have key features including: - Utilizing Zoom Meeting SDK for the creation of the platform - E-commerce functionality - Content management system (CMS) - Responsive design The meeting platform needs to be equipped with: - Video conferencing - Screen sharing - Chat messaging The platform will be primarily used by business professionals, hence it should be designed keeping their needs in mind. Ideal candidates for this project would have prior experience in developing websites with e-commerce functionality, CMS, and a responsive design. Proficiency in using Zoom SDK would be a significant plus. Knowledge of business professional's needs and familiarity with building platforms for such a targeted audience is also an important qualification.";
  return (
    <Stack
      sx={{ width: "100%" }}
      className="project-card border-b pb-6 cursor-pointer hover:bg-[#f1f1f1] transition-all p-3 rounded-2xl"
      onClick={handleClick}
    >
      <Stack my={1} direction="row" justifyContent="space-between">
        <Chip label="Web Development" color="primary" />
        <Typography>Proposals: 10</Typography>
      </Stack>
      <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
        {title}
      </Typography>
      <Typography
        sx={{
          paddingTop: "10px",
          paddingBottom: "20px",
          color: "rgb(0, 30, 0)",
        }}
      >
        Budget: $150
      </Typography>
      <Typography
        variant="body1"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {detail}
      </Typography>
      <Stack my={2} direction="row" sx={{ color: "grey" }}>
        <Typography>Category:</Typography>
        <Typography>{categoryData[3].category[3][0]}</Typography>
      </Stack>
      <Stack my={1} direction="row" spacing={1}>
        {skillSet.map((element, idx) => {
          return <Chip key={`skillset-${idx}`} label={element} />;
        })}
      </Stack>
      <Stack></Stack>
    </Stack>
  );
};

export default ProjectCard;
