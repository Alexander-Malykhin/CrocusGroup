import data from "../../data/docsExt";

const DocumentItem = ({ name, url, ext }) => {
  const img =
    data.find((item) => item.ext === ext.toLowerCase()) ||
    data.find((item) => item.ext === "default");

  return (
    <a
      href={url}
      className="document-item"
      download
      aria-label={`Скачать файл ${name}`}
    >
      <div className="document-item__img image">
        <img src={img.src} alt={name} loading="lazy" />
      </div>
      <div className="document-item__content">
        <span>{name}</span>
      </div>
    </a>
  );
};

export default DocumentItem;
