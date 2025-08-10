"use client";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
