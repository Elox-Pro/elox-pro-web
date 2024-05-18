import Row from "react-bootstrap/esm/Row";
import { useListAvatarsQuery } from "../../api/avatar.api";
import Col from "react-bootstrap/esm/Col";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Avatar } from "../../types/avatar.type";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { setSelectedAvatar } from "../../features/avatar.slice";

export default function AvatarList() {
    const dispatch = useDispatch();

    const { selectedAvatar } = useAppSelector(state => state.avatar);
    const { data, isSuccess, status } = useListAvatarsQuery();
    const [avatars, setAvatars] = useState<Avatar[]>([]);

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            setAvatars(data.avatars);
        }

    }, [status, data])


    return (
        isSuccess && avatars.length > 0 && (
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