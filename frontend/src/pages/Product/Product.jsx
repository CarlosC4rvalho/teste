import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productService from 'services/productService'
import Header from 'components/Header'
import Whatsapp from 'components/Whatsapp'
import Footer from 'assets/Footer/Footer'
import Loading from 'components/Loading'

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const productData = await productService.getProductById(id)
        setProduct(productData)
        if (productData && productData.product_images.length > 0) {
          setCurrentImage(productData.product_images[0])
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error)
      } finally {
        setTimeout(() => setLoading(false), 1000)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      document.title = `Bacana Motors - ${product.name}`
    }
  }, [product])

  const handleThumbnailMouseOver = (imageUrl) => {
    setCurrentImage(imageUrl)
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <Header />
          <main className='mx-4 my-40 flex flex-col justify-center gap-4 md:flex-row md:gap-8'>
            <ImageSection
              currentImage={currentImage}
              productImages={product.product_images}
              handleThumbnailMouseOver={handleThumbnailMouseOver}
              toggleFullScreen={toggleFullScreen}
              isFullScreen={isFullScreen}
            />
            <ProductInfoSection product={product} />
          </main>
          <Footer />
          <Whatsapp />
        </>
      )}
    </>
  )
}

function ImageSection({ currentImage, productImages, handleThumbnailMouseOver, toggleFullScreen, isFullScreen }) {
  const openFullScreen = () => {
    toggleFullScreen()
  }

  return (
    <section className='relative'>
      <div className='flex w-full justify-end gap-4 md:w-3/6'>
        <div className='flex w-full flex-col gap-4 text-black md:w-3/4'>
          <picture>
            <img
              src={`http://192.168.0.106:5000/api/uploads/${currentImage}`}
              alt='Product'
              className='cursor-pointer rounded-md border border-gray-300'
              onClick={openFullScreen}
            />
          </picture>
          <div className='flex w-full gap-2 overflow-auto'>
            {productImages.map((image) => (
              <picture key={image}>
                <img
                  src={`http://192.168.0.106:5000/api/uploads/${image}`}
                  alt='Product Thumbnail'
                  className='h-20 w-20 cursor-pointer rounded-md border border-gray-300 hover:opacity-80'
                  onMouseOver={() => handleThumbnailMouseOver(image)}
                />
              </picture>
            ))}
          </div>
        </div>
      </div>
      {isFullScreen && (
        <FullScreenImage
          currentImage={currentImage}
          productImages={productImages}
          handleThumbnailMouseOver={handleThumbnailMouseOver}
          toggleFullScreen={toggleFullScreen}
        />
      )}
    </section>
  )
}

function FullScreenImage({ currentImage, productImages, handleThumbnailMouseOver, toggleFullScreen }) {
  const closeFullScreen = () => {
    toggleFullScreen()
  }

  return (
    <section className='fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-100'>
      <div className='max-w-screen relative max-h-screen'>
        <picture>
          <img
            src={`http://alavanquedigital.com.br/api/uploads/${currentImage}`}
            alt='Product'
            className='cursor-pointer rounded-md borderobject-contain'
            onClick={closeFullScreen}
          />
        </picture>
        <div className='absolute right-0 top-0 p-4'>
          <button className='bg-dark rounded-md py-2 px-4 text-xl text-white hover:opacity-75' onClick={closeFullScreen}>
            Fechar
          </button>
        </div>
        <div className='absolute bottom-0 left-0 m-8 flex w-full justify-center gap-2'>
          {productImages.map((image) => (
            <picture key={image}>
              <img
                src={`http://alavanquedigital.com.br/api/uploads/${image}`}
                alt='Product Thumbnail'
                className='h-24 w-24 cursor-pointer rounded-md border border-gray-300 hover:opacity-80'
                onMouseOver={() => handleThumbnailMouseOver(image)}
              />
            </picture>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductInfoSection({ product }) {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-2xl md:w-3/6'>
      <span className='bg-red-500 rounded-lg bg-red p-2 px-8 text-center text-3xl font-semibold text-white md:text-4xl'>
        {product.price}
      </span>
      <header className='flex flex-col items-center justify-center gap-2 text-dark'>
        <h2 className='text-xl font-semibold md:text-4xl'>{product.name}</h2>
        <p className='text-base font-medium text-gray-600'>{product.product_categories.join(', ')}</p>
      </header>
      <div className='m-4 flex w-full flex-col gap-4 text-black md:w-3/4'>
        <div className='flex justify-around gap-2'>
          <ul>
            <li>{product.mileage}</li>
            <li>{product.displacement}</li>
            <li>{product.brakes}</li>
          </ul>
          <ul>
            <li>{product.transmission}</li>
            <li>{product.fuel}</li>
            <li>{product.color}</li>
          </ul>
        </div>
        <ul className='list-disc px-4 font-medium'>
          <li>Parcelamos no cartão</li>
          <li>Fazemos financiamento</li>
          <li>Pegamos sua moto usada na troca</li>
        </ul>
        <span className='bg-green-500 rounded-lg bg-green p-3 text-center text-2xl font-semibold text-white md:text-3xl'>
          Tenho interesse
        </span>
        <div className='text-justify text-base'>{product.description}</div>
      </div>
    </section>
  )
}

export default Product
