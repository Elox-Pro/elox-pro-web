import Pagination from "react-bootstrap/esm/Pagination";
import { usePaginator } from "../../hooks/paginator.hook";

type PaginatorProps = {
    onChange?: () => void;
}

export default function Paginator({ onChange }: PaginatorProps) {

    const { items } = usePaginator({ onChange });

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