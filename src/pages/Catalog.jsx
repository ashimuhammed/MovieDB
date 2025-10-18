import React from "react";
import { useParams } from "react-router-dom"; // ✅ Fixed import
import MovieGrid from "../components/movie-grid/MovieGrid";
import PageHeader from "../components/page-header/PageHeader"; // ✅ Also fixed typo in component name
import { category as cate } from "./../api/tmdbApi";

const Catalog = () => {
    const { category } = useParams(); // ✅ Fixed variable name

    console.log(category);

    return (
        <>
            <PageHeader> {/* ✅ Fixed component name */}
                {category === cate.movie ? "Movies" : "TV Series"}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
        </>
    );
};

export default Catalog;