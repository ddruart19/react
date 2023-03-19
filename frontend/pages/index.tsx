import React from "react";
import { HashRouter, Router } from "react-router-dom";

import App from '../src/App'
import Header from "../src/Components/Header";
import Home from "../src/Components/Home";
import { MyPage } from "../src/Components/types";

const Index: MyPage = () => {
    return (
        <>
            <Home/>
        </>

    );
}

export default Index;
Index.Layout = "Connected"