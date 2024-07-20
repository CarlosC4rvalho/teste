import React, { useState } from 'react';
import productService from 'services/productService';

const categories = [
  { id: 1, name: 'motos' },
  { id: 2, name: 'capacetes' },
  { id: 3, name: 'peças' },
  { id: 4, name: 'acessórios' },
  { id: 5, name: 'honda' },
  { id: 6, name: 'yamaha' },
  { id: 7, name: 'street' },
  { id: 8, name: 'scooter' },
  { id: 9, name: 'adventure' },
  { id: 10, name: 'sport' },
  { id: 11, name: 'off-road' },
  { id: 12, name: 'touring' },
];

const ImageCard = ({ image, index, handleDragStart, handleDragOver, handleDrop, handleRemoveImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      key={index}
      className='group relative transform cursor-grab rounded-xl border-2 border-gray-200 ease-in-out'
      draggable={true}
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
      onClick={() => {
        const btn = document.getElementById(`removeButton${index}`);
        btn.style.display = 'block';
      }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <picture className='relative'>
        <img src={URL.createObjectURL(image)} alt={`Imagem ${index}`} loading='lazy' className='h-36 w-36 rounded-xl object-cover' />
      </picture>
      <div className='absolute backdrop-blur-lg bg-filter inset-0 flex select-none items-center justify-center rounded-lg bg-black bg-opacity-50 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100'>
        Arraste e solte para reordenar
      </div>
      <button
        id={`removeButton${index}`}
        className='absolute right-2 top-2 cursor-pointer select-none rounded-md bg-red p-1 text-xs text-white opacity-0 group-hover:opacity-100'
        onClick={() => handleRemoveImage(index)}
      >
        Remover
      </button>
    </div>
  );
};

const MotorcycleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mileage: '',
    displacement: '',
    brakes: '',
    transmission: '',
    fuel: '',
    color: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prevState) =>
      checked ? [...prevState, value] : prevState.filter((category) => category !== value),
    );
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('imageIndex', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('imageIndex');
    if (draggedIndex === '') return;

    const draggedImage = images[draggedIndex];
    const updatedImages = images.filter((_, i) => i.toString() !== draggedIndex);
    updatedImages.splice(index, 0, draggedImage);

    setImages(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log dos valores antes de enviar
    console.log('Valores do formulário:', formData);
    console.log('Imagens selecionadas:', images);
    console.log('Categorias selecionadas:', selectedCategories);

    const productData = {
      ...formData,
      categoryIds: selectedCategories.join(','),
    };

    try {
      const response = await productService.createProduct(productData, images);
      setMessage('Motocicleta criada com sucesso!');
      console.log('Imagens na ordem para o banco de dados:', images);
    } catch (error) {
      setMessage('Erro ao criar motocicleta.');
    }
  };

  return (
    <section className='m-4 flex flex-col gap-4 rounded-xl border-2 border-gray-200 bg-white p-4 text-black md:w-1/2'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <header>
          <h2 className='text-2xl font-semibold'>Adicionar Motocicleta</h2>
        </header>

        {/* Campos de entrada para os dados do motocicleta */}
        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='name'>
            Nome
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Ex: Honda CB 500'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='price'>
            Preço
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='Ex: 25000'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='mileage'>
            Quilometragem
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='mileage'
            value={formData.mileage}
            onChange={handleChange}
            placeholder='Ex: 15000'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='displacement'>
            Cilindrada
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='displacement'
            value={formData.displacement}
            onChange={handleChange}
            placeholder='Ex: 500cc'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='brakes'>
            Freios
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='brakes'
            value={formData.brakes}
            onChange={handleChange}
            placeholder='Ex: ABS'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='transmission'>
            Transmissão
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='transmission'
            value={formData.transmission}
            onChange={handleChange}
            placeholder='Ex: Manual'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='fuel'>
            Combustível
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='fuel'
            value={formData.fuel}
            onChange={handleChange}
            placeholder='Ex: Gasolina'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='color'>
            Cor
          </label>
          <input
            className='rounded-xl bg-gray-200 p-4'
            type='text'
            name='color'
            value={formData.color}
            onChange={handleChange}
            placeholder='Ex: Vermelho'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='font-medium' htmlFor='description'>
            Descrição
          </label>
          <textarea
            className='rounded-xl bg-gray-200 p-4'
            name='description'
            value={formData.description}
            rows={10}
            onChange={handleChange}
            placeholder='Ex: Moto em ótimo estado, com revisão em dia.'
            required
          ></textarea>
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='font-medium'>Selecione as Categorias:</h3>
          <div className='flex flex-wrap items-center gap-2'>
            {categories.map((category) => (
              <label
                key={category.id}
                className='flex flex-1 cursor-pointer items-center gap-2 rounded-xl bg-gray-200 p-2'
              >
                <input
                  type='checkbox'
                  value={category.id}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes(category.id.toString())}
                  className='accent-green'
                />
                <span className='text-xs md:text-lg'>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label
            className='cursor-pointer flex h-44 w-full items-center justify-center rounded-xl border-2 border-dashed border-red text-center text-xs md:text-lg font-medium p-4'
            htmlFor='images'
          >
            Adicione imagens em formatos como: PNG, JPG, SVG e WEBP. Tamanho máximo: 25MB e resolução máxima: 1000x1000.
          </label>
          <input className='hidden' type='file' multiple onChange={handleFileChange} required id='images' />
        </div>

        <div className='flex w-full justify-center items-center flex-wrap gap-2'>
          {images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              index={index}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleRemoveImage={handleRemoveImage}
            />
          ))}
        </div>

        {message && <p className='text-red'>{message}</p>}

        <button
          type='submit'
          className='rounded-xl bg-green p-4 font-medium text-white transition duration-500 hover:opacity-75'
        >
          Cadastrar Motocicleta
        </button>
      </form>
    </section>
  );
};

export default MotorcycleForm;
