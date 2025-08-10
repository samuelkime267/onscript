"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
