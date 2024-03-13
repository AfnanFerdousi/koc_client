"use client";
import { popularCategoryData } from "@/constants/data";
import { Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { CategoryCard } from "./categoryCard";

export const PopularCategory = () => {
    const router = useRouter();
    const onClick = (data: number) => {
        console.log(data);
        router.push(`/category/${data}`, { scroll: false });
    };
    return (
        <div className="card1">
            <Stack>
                <h1 className="h1">Popüler Kategoriler</h1>
            </Stack>
            <Container>
                <div
                   className="grid lg:md:grid-cols-3 grid-cols-1 w-full"
                >
                    {popularCategoryData.map((element, idx) => {
                        const cardProps = {
                            categoryName: element.categoryName,
                            count: element.category.length,
                            image: `./assets/img/${element.image}`,
                            id: element.categoryId,
                            onClick: onClick,
                        };
                        return (
                            <div
                                key={`popular-${idx}`}
                                className="popular-card card-fadeIn"
                            >
                                <CategoryCard {...cardProps} />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};
