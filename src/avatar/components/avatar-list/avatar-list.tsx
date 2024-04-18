import Row from "react-bootstrap/esm/Row";
import { useListAvatarsQuery } from "../../api/avatar.api";
import Col from "react-bootstrap/esm/Col";
import { useDispatch } from "react-redux";
import { setOverlay } from "../../../common/features/common.slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar } from "../../types/avatar.type";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { setSelectedAvatar } from "../../features/avatar.slice";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";

export default function AvatarList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedAvatar } = useAppSelector(state => state.avatar);
    const { data, error, isSuccess, status } = useListAvatarsQuery();
    const [avatars, setAvatars] = useState<Avatar[]>([]);

    useEffect(() => {
        switch (status) {
            case QueryStatus.pending: onInitRequest(); break;
            case QueryStatus.fulfilled: onFulfilled(); break;
            case QueryStatus.rejected: onRejected(); break;
        }

    }, [status, error, data])

    const onInitRequest = () => {
        dispatch(setOverlay(true));
    }

    const onRejected = () => {
        dispatch(setOverlay(false));
        handleRejected({ error, message: "Avatar List Rejected", navigate });
    }

    const onFulfilled = () => {
        dispatch(setOverlay(false));
        if (!data) { return; }
        setAvatars(data.avatars);
    }

    return (
        isSuccess && (
            <Row className="g-0">
                {avatars.map((avatar, index) => (
                    <Col key={index} xs={3} className="p-2">
                        <button
                            className={`${selectedAvatar?.url === avatar.url ? 'active' : ''} btn btn-avatar`}
                            onClick={() => {
                                dispatch(setSelectedAvatar(avatar));
                            }}>
                            <img src={avatar.url} width={96} className="w-100" alt="avatar" />
                        </button>
                    </Col>
                ))}
            </Row>
        )
    )
}