import Pagination from "react-bootstrap/esm/Pagination";
import { usePaginator } from "../../hooks/paginator.hook";
import { useAppSelector } from "../../../app/hooks/app.hooks";

type PaginatorProps = {
    withSearchBar?: boolean;
    onChange?: () => void;
}

export default function Paginator({ onChange, withSearchBar = false }: PaginatorProps) {

    const { items } = usePaginator({ withSearchBar, onChange });
    const paginator = useAppSelector((state) => state.paginator);

    return (
        <>
            <Pagination>
                {items.map((item, index) => {
                    if (item.type === 'button') {
                        return (
                            <Pagination.Item
                                key={index}
                                disabled={item.disabled}
                                active={item.active}
                                onClick={item.onClick}>
                                {item.label}
                            </Pagination.Item>
                        );
                    }

                    if (item.type === 'page') {
                        return (
                            <Pagination.Item
                                key={index}
                                active={item.active}
                                disabled={item.disabled}
                                onClick={item.onClick}>
                                {item.label}
                            </Pagination.Item>
                        );
                    }

                    if (item.type === 'ellipsis') {
                        return (
                            <Pagination.Ellipsis
                                key={index}
                                disabled={item.disabled}
                            />
                        );
                    }
                    return null;
                })}
            </Pagination>
            <p className="text-muted">
                <small>{paginator.results} results</small>
            </p>
        </>
    );
}