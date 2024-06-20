import Row from "react-bootstrap/esm/Row";
import ModalAction from "../../../common/components/modal-action/modal-action.component";
import Col from "react-bootstrap/esm/Col";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setSelectUserTotal, setSelectUserUsers, showSelectUserModal } from "../../features/select-user-slice";
import SearchBar from "../../../common/components/search-bar/search-bar.component";
import { useEffect } from "react";
import { useGetUsersQuery, userApi } from "../../api/user.api";
import { setSearchBarClear, setSearchBarFocus } from "../../../common/features/search-bar.slice";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListItem from "../../../common/components/list-item/list-item.component";
import { User } from "../../types/user.type";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import Paginator from "../../../common/components/paginator/paginator.component";
import { setPaginatorCurrentPage, setPaginatorResults } from "../../../common/features/paginator.slice";
import { setModalActionBackToTop } from "../../../common/features/modal-action.slice";
import { useAddUserToCompanyMutation } from "../../../company/api/company.api";
import { Company } from "../../../company/types/company.type";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { Card } from "react-bootstrap";

export default function SelectUserModal() {

    const selectUser = useAppSelector((state) => state.selectUser);
    const searchBar = useAppSelector((state) => state.searchBar);
    const paginator = useAppSelector((state) => state.paginator);
    const companyInfo = useAppSelector((state) => state.companyInfoPage);
    const dispatch = useAppDispatch();

    const { data, isSuccess } = useGetUsersQuery({
        page: paginator.currentPage,
        limit: paginator.itemsPerPage,
        searchTerm: searchBar.text,
        skipUsersFromCompanyId: companyInfo.company?.id,
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
            <ModalAction.Header onClose={onClose} >
                <ModalAction.Title value="Select User" />
            </ModalAction.Header>
            <ModalAction.Body onBackToTop={handleBackToTop}>
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
                                        <UserItem user={user} company={companyInfo.company} key={index} />
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

    if (!user
        || !user.username
        || !user.id
        || !company
        || !company.id
    ) return null;

    const avatarUrl = getProfileAvatar(user.avatarUrl);
    const username = user.username;
    const roleText = user.roleText;
    const dispatch = useAppDispatch();
    const [mutation, { status, data }] = useAddUserToCompanyMutation();

    const onSubmit = () => {
        try {
            dispatch(setOverlay(true));
            mutation({
                companyId: company.id,
                userId: user.id,
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
            <ListItem.BodyIcon icon="bi bi-plus-circle" />
        </ListItem.Content>
    )
}