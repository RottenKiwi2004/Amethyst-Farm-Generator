public static final ConfiguredFeature<GeodeConfiguration, ?> AMETHYST_GEODE = FeatureUtils.register(
    "amethyst_geode", 
    Feature.GEODE.configured(
        new GeodeConfiguration(
            new GeodeBlockSettings(                         // this.geodeBlockSettings
                BlockStateProvider.simple(Blocks.AIR), 
                BlockStateProvider.simple(Blocks.AMETHYST_BLOCK), 
                BlockStateProvider.simple(Blocks.BUDDING_AMETHYST), 
                BlockStateProvider.simple(Blocks.CALCITE), 
                BlockStateProvider.simple(Blocks.SMOOTH_BASALT), 
                List.of(Blocks.SMALL_AMETHYST_BUD.defaultBlockState(), 
                Blocks.MEDIUM_AMETHYST_BUD.defaultBlockState(), 
                Blocks.LARGE_AMETHYST_BUD.defaultBlockState(), 
                Blocks.AMETHYST_CLUSTER.defaultBlockState()), 
                BlockTags.FEATURES_CANNOT_REPLACE.getName(), 
                BlockTags.GEODE_INVALID_BLOCKS.getName()
            ), 
            new GeodeLayerSettings(                         // this.geodeLayerSettings
                1.7D,       // filling
                2.2D,       // inner
                3.2D,       // middle
                4.2D        // outer
            ),      
            new GeodeCrackSettings(                         // this.geodeCrackSettings
                0.95D,      // crack chance
                2.0D,       // base crack size
                2           // crack point offset
            ),         
            0.35D,                                          // this.usePotentialPlacementsChance
            0.083D,                                         // this.useAlternateLayer0Chance
            true,                                           // this.placementsRequireLayer0Alternate
            UniformInt.of(4, 6),                            // this.outerWallDistance
            UniformInt.of(3, 4),                            // this.distributionPoints
            UniformInt.of(1, 2),                            // this.pointOffset
            -16,                                            // this.minGenOffset
            16,                                             // this.maxGenOffset
            0.05D,                                          // this.noiseMultiplier
            1                                               // this.invalidBlocksThreshold
        )
    )
);













