import Row from "react-bootstrap/esm/Row";
import ModalAction from "../../../common/components/modal-action/modal-action-v1";
import Col from "react-bootstrap/esm/Col";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setSelectUserTotal, setSelectUserUsers, showSelectUserModal } from "../../features/select-user-slice";
import SearchBar from "../../../common/components/search-bar/search-bar";
import { useEffect } from "react";
import { useGetUsersQuery, userApi } from "../../api/user.api";
import { setSearchBarClear, setSearchBarFocus } from "../../../common/features/search-bar.slice";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListItem from "../../../common/components/list-item/list-item-v1";
import { User } from "../../types/user.type";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import Paginator from "../../../common/components/paginator/paginator";
import { setPaginatorCurrentPage, setPaginatorResults } from "../../../common/features/paginator.slice";
import { setModalActionBackToTop } from "../../../common/features/modal-action.slice";
import { useAddUserToCompanyMutation } from "../../../company/api/company.api";
import { Company } from "../../../company/types/company.type";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { Card } from "react-bootstrap";
import { IconType } from "../../../common/enums/icon-type.enum";

export default function SelectUserModal() {

    const selectUser = useAppSelector((state) => state.selectUser);
    const searchBar = useAppSelector((state) => state.searchBar);
    const paginator = useAppSelector((state) => state.paginator);
    const { company } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    const { data, isSuccess } = useGetUsersQuery({
        page: paginator.currentPage,
        limit: paginator.itemsPerPage,
        searchTerm: searchBar.text,
        skipUsersFromCompanyId: company?.id || 0,
    }, { skip: !selectUser.modal.show });

    const onClose = () => {
        dispatch(showSelectUserModal(false));
    }

    const handleBackToTop = () => {
        dispatch(setSearchBarFocus(true));
    }

    const paginatorOnChange = () => {
        dispatch(setSearchBarFocus(true));
        dispatch(setModalActionBackToTop(true));
    }

    const searchBarOnChange = () => {
        dispatch(setPaginatorCurrentPage(1));
        dispatch(setModalActionBackToTop(true));
    };

    const searchBarOnReset = () => {
        dispatch(setPaginatorCurrentPage(1));
    };

    useEffect(() => {
        if (selectUser.modal.show) {
            dispatch(setSearchBarFocus(true));
        } else {
            dispatch(setSearchBarClear());
            dispatch(setPaginatorCurrentPage(1));
        }
    }, [selectUser.modal.show]);

    useEffect(() => {
        if (data && isSuccess) {
            const users = data.users || [];
            const total = data.total || 0;
            dispatch(setSelectUserUsers(users));
            dispatch(setSelectUserTotal(total));
            dispatch(setPaginatorResults(total));
        }
    }, [data, isSuccess]);

    return (
        <ModalAction.Content
            show={selectUser.modal.show}>
            <ModalAction.Header onClose={onClose} />
            <ModalAction.Body onBackToTop={handleBackToTop}>
                <p><strong>Add user to {company?.name} company</strong></p>
                <Row>
                    <Col xs={12}>
                        <SearchBar
                            placeholder="Search by username..."
                            onChange={searchBarOnChange}
                            onReset={searchBarOnReset}
                        />
                    </Col>
                    <Col xs={12} className="mb-5">
                        <Card>
                            <Card.Body>
                                <p>Please select a user from the list below.</p>
                                <ListGroup variant="flush">
                                    {selectUser.users.map((user, index) => (
                                        <UserItem user={user} company={company} key={index} />
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12}>
                        <Paginator onChange={paginatorOnChange} />
                    </Col>
                </Row>
            </ModalAction.Body>
        </ModalAction.Content >
    );
}

type UserItemProps = {
    user: User | null;
    company: Company | null;
}
function UserItem({ user, company }: UserItemProps) {

    const avatarUrl = getProfileAvatar(user?.avatarUrl || null);
    const username = user?.username || "";
    const roleText = user?.roleText || "";
    const dispatch = useAppDispatch();
    const [mutation, { status, data }] = useAddUserToCompanyMutation();

    const onSubmit = () => {
        try {
            dispatch(setOverlay(true));
            mutation({
                companyId: company?.id || 0,
                userId: user?.id || 0,
            });
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            dispatch(showSelectUserModal(false));
            dispatch(userApi.util.invalidateTags(["getUsers"]));
            toast.success("User added successfully");
        }
    }, [status, data])

    return (
        <ListItem.Content onClick={onSubmit}>
            <ListItem.BodyContent>
                <ListItem.Image
                    src={avatarUrl}
                    alt={username}
                    title={username}
                    description={roleText}
                />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon={IconType.PlusCircle} />
        </ListItem.Content>
    )
}