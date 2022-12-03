import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost, setFilter } from "../store/post-slice";
import Form from "./Form";
import Post from "./Post";
import styles from './post.module.css';
export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState(0);

  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const filterBy = useSelector((state) => state.post.filter.toLowerCase());

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const togglePopup = (popup) => {
    setIsOpen(!isOpen);
  };

  const filterPost = post.post.filter((post) => {
    return filterBy ? post.title.toLowerCase().includes(filterBy) : true;
  });

  const onClikPostHandler = (id) => {
    setIsOpen(!isOpen);
    setPostId(id);
  }

  console.log("filterPost", filterPost);
  return (
    <section className="section">
      <div className="container table-responsive py-5">
        <div>
          <div
            className={styles.grouped}
            
          >
            <div className={styles.control}>
              <input
                onChange={(e) => dispatch(setFilter(e.target.value))}
                className={styles.controlSearch}
                placeholder="Search By Title"
                type="text"
              />
            </div>
          </div>
        </div>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterPost &&
              filterPost.map((item, index) => (
                <Post onclickHandler={onClikPostHandler} uniqueId={item.id} postNo={index+1} item={item} />
              ))}
            {filterPost.length === 0 && <tr>No Records Found!!!</tr>}
          </tbody>
        </table>
      </div>
      {isOpen && <Form id={postId} handleClose={togglePopup} />}
    </section>
  );
};
