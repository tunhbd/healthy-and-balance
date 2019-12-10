import React from 'react';
import { Table } from 'react-bootstrap';
import './table.css';
import Label from '../label';
import ic_trash from './ic_trash.svg';
import ic_trash_disable from './ic_trash_disable.svg';
import ic_edit from './ic_edit.svg';
import ic_cancel from './ic_cancel.svg';
import ic_accept from './ic_accept.svg';
import ic_wating from './ic_wating.svg';
import ic_edit_disable from './ic_edit_disable.svg';
import Image from '../image';

// props = {
//     header: []string,
//     data: danh sách bài viết mỗi bài viết gôm {
//          id, title, createdDate, category, status (status 1: đã suyệt, 0 chờ duyệt, -1 bị từ chối)
//      }
//     onRemove: function(id Bài viết),
//     onEdit: function(id Bài viết)
// }
class DataTableComponent extends React.Component {
    getCategory(id) {
        const { categories } = this.props;
        let category;
        // eslint-disable-next-line array-callback-return
        categories.map((v) => {
            if (v.id === id) {
                category = v.title;
                return category;
            }
        });
        return category;
    }

    render() {
        const { header, posts, onRemove, onEdit, maxItems, currentPage } = this.props;
        let postsArr = [];
        for (let i = (currentPage - 1) * maxItems; (i < currentPage * maxItems && i < (posts.length - 1)); i += 1) {
            postsArr.push(posts[i]);
        }

        return (
            <>
                <Table>
                    <thead>
                        <tr>
                            {
                                header.map((v, idx) => (
                                    <th key={idx}><div className="center-cell">{v}</div></th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            postsArr.map((v, idx) => (
                                <tr key={idx}>
                                    <td><div className="center-cell">{v.title}</div></td>
                                    <td><div className="center-cell">{v.createdDate}</div></td>
                                    <td><div className="center-cell">{this.getCategory(v.category)}</div></td>
                                    <td><div className="center-cell">
                                        {
                                            v.status === -1 ?
                                                (<Label type={"danger"} children={<><Image src={ic_cancel} disable />Bị từ chối</>} />)
                                                : v.status === 0 ?
                                                    (<Label type={"warning"} children={<><Image src={ic_wating} disable />Chờ duyệt</>} />)
                                                    :
                                                    <Label type={"primary"} children={<><Image src={ic_accept} disable />Đã duyệt</>} />
                                        }
                                    </div></td>
                                    {
                                        v.status === 1 ?
                                            (<td><div className="center-cell"><Image src={ic_edit_disable} disable /><Image src={ic_trash_disable} disable /></div></td>)
                                            :
                                            (<td><div className="center-cell"><Image src={ic_edit} onClick={() => onEdit(v.id)} /><Image src={ic_trash} onClick={() => onRemove(v.id)} /></div></td>)
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </>
        )
    }
}

export default DataTableComponent;