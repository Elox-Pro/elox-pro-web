import Row from "react-bootstrap/esm/Row";
import ModalAction from "../../../common/components/modal-action/modal-action.component";
import Col from "react-bootstrap/esm/Col";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setSelectUserTotal, setSelectUserUsers, showSelectUserModal } from "../../features/select-user-slice";
import SearchBar from "../../../common/components/search-bar/search-bar.component";
import { useEffect } from "react";
import { useGetUsersQuery } from "../../api/user.api";
import { setSearchBarFocus, setSearchBarResults, setSearchBarText } from "../../../common/features/search-bar.slice";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListItem from "../../../common/components/list-item/list-item.component";
import { User } from "../../types/user.type";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import Paginator from "../../../common/components/paginator/paginator.component";
import { setPaginatorCurrentPage, setPaginatorResults } from "../../../common/features/paginator.slice";
import { setModalActionBackToTop } from "../../../common/features/modal-action.slice";

export default function SelectUserModal() {

    const selectUser = useAppSelector((state) => state.selectUser);
    const searchBar = useAppSelector((state) => state.searchBar);
    const paginator = useAppSelector((state) => state.paginator);
    const companyInfo = useAppSelector((state) => state.companyInfo);
    const dispatch = useAppDispatch();

    const { data, isSuccess } = useGetUsersQuery({
        page: paginator.currentPage,
        limit: paginator.itemsPerPage,
        searchTerm: searchBar.text,
        skipUsersFromCompanyId: companyInfo.company?.id,
    }, { skip: !selectUser.modal.show });

    const onClose = () => {
        dispatch(showSelectUserModal(false));
        dispatch(setSearchBarText(""));
        dispatch(setPaginatorCurrentPage(1));
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
        dispatch(setSearchBarFocus(true));
    }, [selectUser.modal.show]);

    useEffect(() => {
        if (data && isSuccess) {
            const users = data.users || [];
            const total = data.total || 0;
            dispatch(setSelectUserUsers(users));
            dispatch(setSelectUserTotal(total));
            dispatch(setSearchBarResults(total));
            dispatch(setPaginatorResults(total));
        }
    }, [data, isSuccess]);

    return (
        <ModalAction.Content
            show={selectUser.modal.show}>
            <ModalAction.Header onClose={onClose} />
            <ModalAction.Body onBackToTop={handleBackToTop}>
                <Row>
                    <Col xs={12}>
                        <SearchBar
                            placeholder="Select an user..."
                            onChange={searchBarOnChange}
                            onReset={searchBarOnReset}
                        />
                    </Col>
                    <Col xs={12}>
                        <ListGroup variant="flush" className="mb-5">
                            {selectUser.users.map((user, index) => (
                                <UserItem user={user} key={index} />
                            ))}
                        </ListGroup>
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
}
function UserItem({ user }: UserItemProps) {

    if (!user || !user.username) return null;

    const avatarUrl = getProfileAvatar(user.avatarUrl);
    const username = user.username;

    const onSubmit = () => {
        console.log(user.username, user.roleText, user.id);
    };

    return (
        <ListItem.Content onClick={onSubmit}>
            <ListItem.BodyContent>
                <ListItem.Image
                    src={avatarUrl}
                    alt={username}
                    value={username} />
            </ListItem.BodyContent>
            <ListItem.BodyIcon icon="bi bi-plus-circle" />
        </ListItem.Content>
    )
}