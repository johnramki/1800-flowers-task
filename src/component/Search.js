import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost, setFilter } from "../store/post-slice";
import Form from "./Form";

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

  console.log("filterPost", filterPost);
  return (
    <section className="section">
      <div className="container">
        <div>
          <div
            className="field is-grouped"
            style={{ alignItems: "center", padding: "10px" }}
          >
            <div className="control" style={{ minWidth: "300px" }}>
              <input
                onChange={(e) => dispatch(setFilter(e.target.value))}
                style={{ width: "80%" }}
                placeholder="Search By Title"
                type="text"
              />
            </div>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterPost &&
              filterPost.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setPostId(item.id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            {filterPost.length === 0 && <tr>No Records Found!!!</tr>}
          </tbody>
        </table>
      </div>
      {isOpen && <Form id={postId} handleClose={togglePopup} />}
    </section>
  );
};
