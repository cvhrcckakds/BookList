import { useState } from "react";
import Header from "./component/Header/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import BookCard from "./component/Header/BookCard/BookCard";
import DeleteModal from "./component/DeleteModal/DeleteModal";
import EditModal from "./component/EditModal/editModal";

function App() {
  //yeni kitabın adının utulduğu state
  const [bookName, setBookName] = useState("");
  //tüm kitap verilerini tutulduğu state
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [editItem, setEditItem] = useState({});
  //inputun içeriğini almak içi fonksşyon
  //input her değşitğinde çalışır
  const handleChange = (e) => {
    //console.log(e.target.value)
    setBookName(e.target.value);
  };

  //console.log("Statedeki kitap", bookName);

  //Kitap ekleme fonksiyonu
  const handleSubmit = (e) => {
    //Formun varsayılan yenileme özlleği gibi temel özelliklerini kapattık
    e.preventDefault();
    //console.log("Form Fonksiyonu");
    //eğer kitap ismi yoksa yani input boş ise
    if (!bookName) {
      //mesaj gösterme işlevi
      toast.warn("Lütfen Kitap İsmi Giriniz", { autoClose: 500 });
      //fonksnun aşağıya devam etmsini engelledik
      return;
    }
    //yeni bir kitap oluşrmua objesi
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    //console.log("yeni Kitap objesi", newBook);

    //spread operatör (...) yarıdmı ile state içinde bulunan
    //tüm kitapları dizi içine aktardık daha sonra üstüne yeni oluşturdğumuz
    //kitabı ekledik
    setBooks([...books, newBook]);

    toast.success("Kitap Başarıyla Eklendi", { autoClose: 500 });
    //ekleme işlemi bitince inğutun içini temizleme
    setBookName("");
  };
  //console.log("Kitaplar Dizisi", books);

  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeleteTitle(deleteBookTitle);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    //console.log('delete Fonksiyon')

    const filteredBooks = books.filter((book) => book.id !== deleteId);

    console.log(filteredBooks);

    setBooks(filteredBooks);
    setShowDeleteModal(false);

    toast.error("Kitap Başarıyla Silindi", { autoClose: 500 });
  };

  const handleEditModal = (editBook) => {
    //  console.log("düzenleme modalı");
    setEditItem(editBook);
    setShowEditModal(true);
    // console.log(editBook)
  };

  const handleEditBook = () => {
    // console.log('edit fonksiyonu')

    const editIndex = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];

    cloneBooks.splice(editIndex, 1, editItem);
    setBooks(cloneBooks);
    setShowEditModal(false);
    toast.success("Kitap Başarıyla Güncellendi", { autoClose: 500 });
  };

  //Kitabı Okundu Olarak İşaretleme
  const handleRead = (readBook) => {
    //console.log('read Fonksiyonu')
    console.log(readBook);
    //objenin okundu değerini tam tersine çevirme
    const updatedBook = { ...readBook, isRead: !readBook.isRead };
    //console.log(updatedBook);
    //güncellenecek elemanın index değerini bulma
    const index = books.findIndex((book) => book.id === readBook.id);
    //statein kopyasıını oluştruma
    const cloneBooks = [...books];
    //güncellenecek elemanın indexini güncel kitapla değiştrime
    cloneBooks[index] = updatedBook;
    setBooks(cloneBooks);
  };
  return (
    <div>
      <Header />

      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChange}
            placeholder="Bir Kitap İsmi Giriniz"
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {/*Eğer kitap dizim boş ise  */}
        {books.length === 0 ? (
          <h4>Henz Herhangi bir kitap eklenmedi</h4>
        ) : (
          //Kitap dizimde Eleman varsa
          books.map((book) => (
            <BookCard
              handleEditModal={handleEditModal}
              handleModal={handleModal}
              bookInfo={book}
              key={book.id}
              handleRead={handleRead}
            />
          ))
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showEditModal && (
        <EditModal
          handleEditBook={handleEditBook}
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
}

export default App;
