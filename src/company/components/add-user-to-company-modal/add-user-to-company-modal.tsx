import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setSearchBarClear, setSearchBarFocus } from "../../../common/features/search-bar.slice";
import { useAddUserToCompanyMutation, useFindManyUsersQuery } from "../../api/company.api";
import { setShowAddUserToCompanyModal, setTotalUsers, setUsers } from "../../features/company.slice";
import { setPaginatorCurrentPage, setPaginatorResults } from "../../../common/features/paginator.slice";
import ModalAction from "../../../common/components/modal-action/modal-action";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SearchBar from "../../../common/components/search-bar/search-bar";
import CardList from "../../../common/components/card-list/card-list";
import Paginator from "../../../common/components/paginator/paginator";
import { User } from "../../../users/types/user.type";
import { Company } from "../../types/company.type";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { QueryStatus } from "@reduxjs/toolkit/query";
import ListItem from "../../../common/components/list-item/list-item";
import { IconType } from "../../../common/enums/icon-type.enum";

export default function AddUserToCompanyModal() {

    const searchBar = useAppSelector((state) => state.searchBar);
    const paginator = useAppSelector((state) => state.paginator);
    const { company, showAddUserToCompanyModal, users } = useAppSelector((state) => state.company);
    const dispatch = useAppDispatch();

    const { data, isSuccess } = useFindManyUsersQuery({
        page: paginator.currentPage,
        limit: paginator.itemsPerPage,
        searchTerm: searchBar.text,
        companyId: company?.id || 0,
    }, { skip: !showAddUserToCompanyModal });

    const onClose = () => {
        dispatch(setShowAddUserToCompanyModal(false));
    }

    const handleBackToTop = () => {
        dispatch(setSearchBarFocus(true));
    }

    useEffect(() => {
        if (showAddUserToCompanyModal) {
            dispatch(setSearchBarFocus(true));
        } else {
            dispatch(setSearchBarClear());
            dispatch(setPaginatorCurrentPage(1));
        }
    }, [showAddUserToCompanyModal]);

    useEffect(() => {
        if (data && isSuccess) {
            const users = data.users || [];
            const total = data.total || 0;
            dispatch(setUsers(users));
            dispatch(setTotalUsers(total));
            dispatch(setPaginatorResults(total));
        }
    }, [data, isSuccess]);

    return (
        <ModalAction
            show={showAddUserToCompanyModal}>
            <ModalAction.Header onClose={onClose} />
            <ModalAction.Body onBackToTop={handleBackToTop}>
                <ModalAction.Title value={`Add user to ${company?.name} company`} />
                <ModalAction.Description value={"Please select a user from the list below."} />
                <Row>
                    <Col xs={12}>
                        <SearchBar
                            placeholder="Search by username..."
                            withPaginator
                        />
                    </Col>
                    <Col xs={12} className="mb-5">
                        <CardList>
                            {users.map((user, index) => (
                                <UserItem user={user} company={company} key={index} />
                            ))}
                        </CardList>
                    </Col>
                    <Col xs={12}>
                        <Paginator withSearchBar />
                    </Col>
                </Row>
            </ModalAction.Body>
        </ModalAction>
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
            dispatch(setShowAddUserToCompanyModal(false));
            toast.success("User added successfully");
        }
    }, [status, data])

    return (
        <ListItem onClick={onSubmit}>
            <ListItem.Body icon={IconType.PlusCircle}>
                <ListItem.Image
                    src={avatarUrl}
                    alt={username}
                    value={username}
                    description={roleText}
                />
            </ListItem.Body>
        </ListItem>
    )
}