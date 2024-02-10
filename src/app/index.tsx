import { Header } from "@/components/Header"
import { View, FlatList, SectionList, Text } from "react-native"
import { Link } from "expo-router"

import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products"
import { CategoryButton } from "@/components/CategoryButton"
import { useState, useRef } from "react"
import { CardProduct } from "@/components/CardProduct"
import { useCartStory } from "@/store/cart-story"

export default function Home() {
  const cartStore = useCartStory()
  const [category, setCategory] = useState(CATEGORIES[0])
  const sectionRef = useRef<SectionList<ProductProps>>(null)

  const cartQuantityItem = cartStore.products.reduce((total, product) => total + product.quantity, 0)

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      category => category === selectedCategory
    )

    if (sectionRef.current) {
      sectionRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItem} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => {
              handleCategorySelected(item)
            }}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionRef}
        sections={MENU}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <CardProduct data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-slate-50 font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  )
}
