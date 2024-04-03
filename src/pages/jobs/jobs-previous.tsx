import {
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  FormControl,
  Select,
  FormGroup,
  FormControlLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import * as React from "react";
import ProjectCard from "../../components/projectCard/projectCard";
import { categoryData } from "../../constants/categoryData";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
// import "./style.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FindWorkPage: React.FC = () => {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Stack
      sx={{
        backgroundColor: "whitesmoke",
        paddingTop: "100px",
        paddingBottom: "50px",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container>
        <Stack my={4}>
          <Typography sx={{ fontSize: "18px", color: "grey" }}>
            Project List
          </Typography>
        </Stack>

        <Stack direction="row">
          <Stack sx={{ width: "70%" }}>
            <Stack sx={{ minHeight: "60vh" }}>
              <Divider />
              <ProjectCard />
              <Divider />
            </Stack>
            <Stack my={3} direction="row" justifyContent="space-between">
              <Stack spacing={1} direction="row">
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Jobs per page:
                </Typography>
              </Stack>
              <Pagination count={10} color="primary" />
            </Stack>
          </Stack>
          <Stack px={4} sx={{ width: "30%" }}>
            <Typography
              variant="h5"
              sx={{ paddingBottom: "20px", fontWeight: "600" }}
            >
              Filters
            </Typography>
            <Stack my={1}>
              <Typography
                sx={{ color: "grey", fontWeight: "700", paddingBottom: "20px" }}
              >
                Category
              </Typography>
              <FormControl sx={{ m: 1, width: 300 }}>
                {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Placeholder</em>;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                >
                  {categoryData.map((element, idx) => (
                    <MenuItem
                      key={`categoryDetail-${idx}`}
                      value={element.categoryName}
                    >
                      <Checkbox
                        checked={personName.indexOf(element.categoryName) > -1}
                      />
                      <ListItemText primary={element.categoryName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack my={1}>
              <Typography
                sx={{ color: "grey", fontWeight: "700", paddingBottom: "20px" }}
              >
                The numbers of Proposals
              </Typography>
              <FormGroup sx={{ paddingLeft: "20px" }}>
                {[
                  "Less than 5",
                  "5 to 10",
                  "10 to 15",
                  "15 to 20",
                  "20 to 50",
                  "More than 50",
                ].map((data, idx) => (
                  <FormControlLabel
                    key={`proposals-${idx}`}
                    control={<Checkbox />}
                    label={data}
                  />
                ))}
              </FormGroup>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </Stack>
  );
};

export default FindWorkPage;
