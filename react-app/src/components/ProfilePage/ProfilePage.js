import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

export default function ProfilePage() {
    const sessionUser = useSelector((state) => state.session.user);

    return ('Profile PAge')
}
