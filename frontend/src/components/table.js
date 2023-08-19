import '../assets/table.css';

function Table(transactions) {
    const headers = transactions.headers;
    const items = transactions.items;

    function RenderTableRows(items) {
        if(items.length > 0) {
            let arr = items[0].map((_, c) => items.map(r => r[c]));
            return arr.map(rows => {
                let row = rows.map(cell => <td>{cell}</td>);
                return(
                    <tr>{row}</tr>
                );
            });
        }
    }

    return (
        <div>
            <table>
                <thead>{headers.map((header) => <th>{header}</th>)}</thead>
                {RenderTableRows(items)}
            </table>
        </div>
    );
}

export default Table;