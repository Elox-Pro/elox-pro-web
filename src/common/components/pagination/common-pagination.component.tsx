import Pagination from "react-bootstrap/esm/Pagination";
import { PaginationItem } from "../../hooks/pagination.hook";

type CommonPaginationProps = {
    items: PaginationItem[];
}

export default function CommonPagination({ items }: CommonPaginationProps) {
    return (
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
    );
}